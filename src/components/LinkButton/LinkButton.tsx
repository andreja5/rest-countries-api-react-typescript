import React, { FC } from "react";
import './LinkButton.scss';
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  classBlock?: string;
  icon?: string;
  label: string;
}

const LinkButton: FC<LinkButtonProps> = ({ to, icon, label, classBlock }):JSX.Element => {
    return (
        <Link to={to}>
            <button className={classBlock?.length ? `${classBlock}-button link-button` : 'link-button'}>
                {icon && <i className={`${icon} link-button-icon`} />}
                {label}
            </button>
        </Link>
    );
}

export default LinkButton;
