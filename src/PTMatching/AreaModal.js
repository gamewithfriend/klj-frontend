import React from 'react';
import matchingStyle from "../style/matching.module.css"

const AreaModal = () => {
    return (
        <div className={matchingStyle.modalContainer}>
            <div className="modal-content">
              <p>모달 테스트</p>
            </div>
          </div>
    );
};

export default AreaModal;