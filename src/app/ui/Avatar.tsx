'use client'
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { Status } from "@/app/lib/types";
import { beautifyStatus } from "@/app/lib/utils";

interface AvatarProps {
  className?: string;
  name: string;
  currentStatus: string;
}

const Avatar: React.FC<React.PropsWithChildren<AvatarProps>> = (props) => {
  return (
    <Tooltip
      title={
        <div className='flex flex-col'>
          <div className="font-bold">
            {props.name}
          </div>
          <div>
            {`Status: ${beautifyStatus(props.currentStatus)}`}
          </div>
        </div>
      }
      followCursor
    >
      <div 
        className={`
          w-10
          h-10
          rounded-full
          border-4
          ${props.currentStatus === Status.PRESENT ? `border-green-500` : `border-blue-500`}
          overflow-hidden
          ${props.className}
        `}
        data-testid="avatar-parent"
      >
        {props.children}
      </div>
    </Tooltip>
  );
}

export default Avatar;
