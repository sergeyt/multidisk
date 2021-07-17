import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";

const MoreMenu: React.FC<{ id: string; children: any }> = ({
  id,
  children,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" aria-label="more" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {React.Children.map(children, (item, key) => {
          const originalClickHandler = item.props.onClick;
          return React.cloneElement(item, {
            key,
            onClick: () => {
              originalClickHandler();
              handleClose();
            },
          });
        })}
      </Menu>
    </>
  );
};

export default MoreMenu;
