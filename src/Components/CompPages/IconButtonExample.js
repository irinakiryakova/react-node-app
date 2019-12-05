import React from 'react';
import IconButton from '@material-ui/core/IconButton';
//import ActionHome from '@material-ui/svg-icons/action/home';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const iconStyles = {
  marginRight: 24,
};

const styles = {
  icon: {
    margin: 0,
  },
};

function addColor() {
  this.style.backgroundColor = 'magenta';
}

function removeColor() {
  this.style.backgroundColor = 'white';
}

const IconButtonExampleSimple = () => (
  <IconButton tooltip="Font Icon" onMouseEnter={addColor}
    onMouseLeave={removeColor} style={styles.icon}
  >
    <InsertDriveFileIcon style={iconStyles} color={'black'} />
  </IconButton>
);

export default IconButtonExampleSimple;
