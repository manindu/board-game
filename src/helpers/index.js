import { message } from 'antd';

export const success = (points) => {
  message.success(`Round Completed. You Earned ${points} Points`);
};

export const error = () => {
  message.error('Round Failed');
};

export const calculatePoints = (roundDuration) => {
  if (roundDuration >= 20) {
    return 5;
  } else if (roundDuration < 20 && roundDuration >= 10 ) {
    return 8;
  } else if (roundDuration < 10 && roundDuration >= 5) {
    return 10;
  } else if (roundDuration < 5) {
    return 15;
  }
}
