import React from "react";
import Navbar from "../Navbar/Navbar";

const Stepper = () => {
  return (
    <>
    <Navbar/>
    <div>
      <div class="row mt-1">
        <div class="col-md-12">
          <ul class="stepper stepper-vertical">
            <li class="completed">
              <a href="#!">
                <span class="circle">1</span>
                <span class="label">First step</span>
              </a>
            </li>

            <li class="active">
              <a href="#!">
                <span class="circle">2</span>
                <span class="label">Second step</span>
              </a>

              <div class="step-content grey lighten-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                  cupiditate voluptate facere iusto quaerat vitae excepturi,
                  accusantium ut aliquam repellat atque nesciunt nostrum
                  similique. Inventore nostrum ut, nobis porro sapiente.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolore error excepturi veniam nemo repellendus, distinctio
                  soluta vitae at sit saepe. Optio eaque quia excepturi adipisci
                  pariatur totam, atque odit fugiat.
                </p>
                <p>
                  Deserunt voluptatem illum quae nisi soluta eum perferendis
                  nesciunt asperiores tempore saepe reiciendis, vero quod a
                  dolor corporis natus qui magni quas fuga rem excepturi
                  laboriosam. Quisquam expedita ab fugiat.
                </p>
              </div>
            </li>

            <li class="warning">
              <a href="#!">
                <span class="circle">
                  <i class="fas fa-exclamation"></i>
                </span>
                <span class="label">Third step</span>
              </a>
            </li>

            <li>
              <a href="#!">
                <span class="circle">4</span>
                <span class="label">Fourth step</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row mt-1">
        <div class="col-md-12 text-right">
          <button class="btn btn-flat btn-sm">Cancel</button>
          <button class="btn btn-primary btn-sm">Next</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Stepper;
