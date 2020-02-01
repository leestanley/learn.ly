const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const admin = require('firebase-admin');

let serviceAccount = require('./servicekey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

global.config = require('./config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup the Mux SDK
const Mux = require('@mux/mux-node');
const { Video } = new Mux(config.MUX_TOKEN_ID || process.env.MUX_TOKEN_ID, config.MUX_TOKEN_SECRET || process.env.MUX_TOKEN_SECRET);
let STREAM;

// Storage Configuration
const util = require('util');
const fs = require('fs');
const stateFilePath = './.data/stream';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Authentication Configuration
const webhookUser = {
  name: 'muxer',
  pass: 'muxology',
};

// Authentication Middleware
const auth = (req, res, next) => {
  function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
  };
  const user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
      return unauthorized(res);
  };
  if (user.name === webhookUser.name && user.pass === webhookUser.pass) {
      return next();
  } else {
      return unauthorized(res);
  };
};

// Creates a new Live Stream so we can get a Stream Key
const createLiveStream = async () => {
  if (!(config.MUX_TOKEN_ID || process.env.MUX_TOKEN_ID) || !(config.MUX_TOKEN_SECRET || process.env.MUX_TOKEN_SECRET)) {
    console.error("It looks like you haven't set up your Mux token in the .env file yet.");
    return;
  }

  // Create a new Live Stream!
  return await Video.LiveStreams.create({
    playback_policy: 'public',
    reconnect_window: 10,
    new_asset_settings: { playback_policy: 'public' }
  });
};

// Reads a state file looking for an existing Live Stream, if it can't find one,
// creates a new one, saving the new live stream to our state file and global
// STREAM variable.
const initialize = async () => {
  //try {
  //  const stateFile = await readFile(stateFilePath, 'utf8');
  //  STREAM = JSON.parse(stateFile);
//    console.log('Found an existing stream! Fetching updated data.');
//    STREAM = await Video.LiveStreams.get(STREAM.id);
//  } catch (err) {
    console.log('No stream found, creating a new one.');
    STREAM = await createLiveStream();
    await writeFile(stateFilePath, JSON.stringify(STREAM));
//  }
  return STREAM;
}

// Lazy way to find a public playback ID (Just returns the first...)
const getPlaybackId = stream => stream['playback_ids'][0].id;

// Gets a trimmed public stream details from a stream for use on the client side
const publicStreamDetails = stream => ({
  status: stream.status,
  playbackId: getPlaybackId(stream),
  recentAssets: stream['recent_asset_ids'],
})

app.get('/createstream', async(req, res) => {
  initialize().then((stream) => {
    console.log(stream);
    res.json({
      id: stream.id,
      playbackId: stream['playback_ids'][0].id,
      streamKey: stream.stream_key
    })
  });
});

app.post('/webhook', async(req, res) => {
  console.log(req.body);
  res.send('hello');

  let db = admin.firestore();

  let docRef = db.collection('streams').doc('current');

  let setAda = docRef.update({
    status: req.body.data.status
  });
});

// Starts the HTTP listener for our application.
// Note: glitch helpfully remaps HTTP 80 and 443 to process.env.PORT
/*
initialize().then((stream) => {
  const listener = http.listen(process.env.PORT || 4000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
    console.log('HERE ARE YOUR STREAM DETAILS, KEEP THEM SECRET!');
    console.log(stream['playback_ids'][0].id);
    console.log(`Stream Key: ${stream.stream_key}`);
  });
});
}*/


// API for getting the current live stream and its state for bootstrapping the app
app.get('/stream', async (req, res) => {
  const stream = await Video.LiveStreams.get(STREAM.id);
  res.json(
    publicStreamDetails(stream)
  );
});

// API which Returns the 5 most recent VOD assets made from our Live Stream
app.get('/recent', async (req, res) => {
  const recentAssetIds = STREAM['recent_asset_ids'] || [];

  // For each VOD asset we know about, get the details from Mux Video
  const assets = await Promise.all(
    recentAssetIds
    .reverse()
    .slice(0, 5)
    .map((assetId) =>
      Video.Assets.get(assetId).then(asset => {

        return {
          playbackId: getPlaybackId(asset),
          status: asset.status,
          createdAt: asset.created_at,
        };
      })
    )
  );
  res.json(assets);
});

// API which Listens for callbacks from Mux
app.post('/mux-hook', auth, function (req, res) {
  STREAM.status = req.body.data.status;

  switch (req.body.type) {


    // When a stream goes idle, we want to capture the automatically created
    // asset IDs, so we can let people watch the on-demand copies of our live streams
    case 'video.live_stream.idle':
      STREAM['recent_asset_ids'] = req.body.data['recent_asset_ids'];
      // We deliberately don't break; here

    // When a Live Stream is active or idle, we want to push a new event down our
    // web socket connection to our frontend, so that it update and display or hide
    // the live stream.
    case 'video.live_stream.active':
      io.emit('stream_update', publicStreamDetails(STREAM));
      break;
    default:
      // Relaxing.
  }

  res.status(200).send('Thanks, Mux!');
});

http.listen(process.env.PORT || 4000);
