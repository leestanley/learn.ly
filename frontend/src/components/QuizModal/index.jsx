import React from 'react';
import { Form, Input, Modal } from 'antd';

import Button from '../Button';
import QuizFormik from '../../containers/QuizFormik';

import './style.less';

const ModalComponent = props => {
  return (
    <Modal
      className="modal"
      footer={null}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      title={props.title}
      visible={props.visible}
      closable={false}
      maskClosable={true}
    >
      <QuizFormik />
    </Modal>
  );
};

export default ModalComponent;
