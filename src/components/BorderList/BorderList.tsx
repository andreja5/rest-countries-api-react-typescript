import React, { FC } from "react";
import './BorderList.scss';
import { shorten } from "../../utils/helperFunctions";
import LinkButton from "../LinkButton/LinkButton";

interface BordersListProps {
  label: string;
  items: any[];
  length?: number;
}

const BordersList: FC<BordersListProps> = ({ label, items, length=10 }): JSX.Element => {
    return (
        <div className='border-list'>
            <h3 className="border-list-title">{label}</h3>
            {items.map((item: any) => (
                <LinkButton
                    key={item}
                    classBlock='border-list'
                    to={`/country/${item[0]}`}
                    label={shorten(item[1], length)}
                />
            ))}
        </div>
    );
}

export default BordersList;
