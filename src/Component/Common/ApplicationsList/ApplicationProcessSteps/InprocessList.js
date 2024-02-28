import React from 'react'

function InprocessList() {
  return (
    <section className="">
    <div className="container">
      <div className="voucherFormMain upload_new_application">
        <h3>Application in process</h3>
     

        <div className="">
          <div className=" row my-5" id="table-contexual">
            <div className="col-12">
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Application Name </th>
                    <th scope="col">Status</th>
                    <th scope="col">Rule 1</th>
                    <th scope="col">Rule 2</th>
                    <th scope="col">Rule 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1220872-00</td>
                    <td>Done</td>
                    <td>
                      <img src="../../images/icon2.png"></img>
                    </td>
                   
                  </tr>
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default InprocessList