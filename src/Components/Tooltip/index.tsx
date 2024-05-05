import React, {useState} from 'react';

const Tooltip = ({content, children}) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="relative inline-block">
          <span
              className="cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
          >
            {children}
          </span>
                {showTooltip && (
                    <div className="absolute z-10 bg-gray-800 text-white px-2 py-1 rounded-md whitespace-nowrap">
                        {content}
                    </div>
                )}
        </div>
    );
};

export default Tooltip;
