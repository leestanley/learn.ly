import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import { Form, Input, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import temp from '../../assets/temp.jpg';
import { getVideos } from '../../actions/videoActions';

import './style.less';

const LBeginForm = (props) => {
  useEffect(() => {
    let data = props.getVideos();
  }, []);

  const getThumbcards = (videos, index) => {
        console.log(props.videos)
    if(videos && videos.videos) {
      return <img src={`https://image.mux.com/${videos.videos[index].playback_ids[0].id}/thumbnail.png`}/>;
    }
    return <img src={temp}/>;
  }

  return (
    <div className="LBeginForm">
      <form onSubmit={props.handleSubmit} className="login-form">
        <h3> View a cast </h3>
        <Row gutter={[12]}>
          <Col span={12}>
            {getThumbcards(props.videos, 0)}
          </Col>
          <Col span={12}>
            {getThumbcards(props.videos, 1)}
          </Col>
        </Row>
        <h2></h2>
         <h3> Your Language </h3>
         <Form.Item>
           <div>
             <Radio.Group className="radio"
               onChange={language=> props.setFieldValue('language', language.target.value)}
               defaultValue="English">
               <Radio.Button className="radio-button" value="English">English</Radio.Button>
               <Radio.Button className="radio-button" value="Italian">Italian</Radio.Button>
               <Radio.Button className="radio-button" value="Chinese">Chinese</Radio.Button>
               <Radio.Button className="radio-button" value="German">German</Radio.Button>
             </Radio.Group>
           </div>
          </Form.Item>
          <NavLink to="/student">
            <Button className="button" color='#B6CBFE' size='20px' width='120px' htmlType="submit">
              Submit
            </Button>
          </NavLink>
      </form>
  </div>
);
};

const mapStateToProps = state => ({
  videos: state.videos.videos
});

export default connect(
  mapStateToProps,
  { getVideos }
)(LBeginForm);
