import * as Icons from '../../constants/icons';

const Icon = ({ name }) => {
  const icon = Icons[name];
  return icon;
}

export default Icon;