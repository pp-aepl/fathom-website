import React, { useEffect, useState } from "react";

let formValue;

function SignAgreement({ callback, submitArray, brand_id, preDataObj }) {
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    let index = submitArray?.findIndex(
      (ele) => ele.type === "signAgreement" && ele?.submit
    );
    if (index > -1) {
      callback(formValue);
      setSubmit(true);
    }
  }, [submitArray]);
  return (
    <>
      <div className="basicInfo d-flex">
        <figure className="me-4">
          <img src="../../../images/basic_info_icon.svg" alt="" />
        </figure>
        <div className="rightSidebarForm">
          <div className="basicTitle mb-lg-4 mb-3">
            <h6>Sign Murabaha Agreement</h6>
            <p>Enter the event title, description</p>
          </div>
          <form id="contact" method="post" className="vchForm" role="form">
            <div className="formInn">
              <div className="row pb-4">
                <div className="col-md-12 form-group position-relative">
                  <input
                    className="form-control"
                    placeholder=""
                    type="text"
                    required
                  />
                  <i>Event Title*</i>
                </div>
              </div>
              <div className="row pb-4">
                <div className="col-md-6 form-group d-flex align-items-center mb-4 mb-md-0">
                  <select name="cars" id="cars">
                    <option value="Select Brand">Category</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Realme">Realme</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="LG">LG</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
                <div className="col-md-6 form-group d-flex align-items-center">
                  <select name="cars" id="cars">
                    <option value="Select Brand">Sub Category</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Realme">Realme</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="LG">LG</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
              </div>
              <div className="row pb-4">
                <div className="col-md-12 form-group position-relative">
                  <textarea
                    className="form-control"
                    placeholder=""
                    rows="5"
                    required
                  ></textarea>
                  <i>Description</i>
                  <button className="AiBtn">+AI</button>
                </div>
              </div>
              <div className="row pb-4">
                <div className="col-md-12 form-group">
                  <select name="cars" id="cars">
                    <option value="Select Brand">Location Visibility*</option>
                    <option value="Nokia">Nokia</option>
                    <option value="Realme">Realme</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="LG">LG</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignAgreement;




