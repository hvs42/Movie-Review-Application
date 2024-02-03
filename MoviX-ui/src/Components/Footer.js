import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer">

      <footer class="page-footer font-small blue pt-4">

        <div class="container-fluid text-center text-md-left">

          <div class="row">

            <div class="col-md-6 mt-md-0 mt-3">

              <h5 class="text-uppercase">MoviX.com</h5>

              <p>

                Here you can use rows and columns to organize your footer

                content.

              </p>

            </div>




            <div class="col-md-3 mb-md-0 mb-3">

              <h5 class="text-uppercase">Connect With us</h5>




              <ul class="list-unstyled">

                <li>

                  <i class="youtube icon"></i>

                  YouTube

                </li>

                <li>

                  <i class="instagram icon"></i>

                  Instagram



                </li>

                <li>

                  <i class="linkedin icon"></i>

                  LinkedIn

                </li>



              </ul>

            </div>




            <div class="col-md-3 mb-md-0 mb-3">

              <h5 class="text-uppercase">Follow us here</h5>




              <ul class="list-unstyled">

                <li>

                  <i class="facebook icon"></i>

                  Facebook

                </li>

                <li>

                  <i class="twitter icon"></i>

                  Twitter

                </li>

                <li>

                  <i class="google plus icon"></i>

                  Google Plus

                </li>



              </ul>

            </div>

          </div>

        </div>

        <div class="footer-copyright text-center py-3">

          © 2023 Copyright:

          <Link to_="/" style={{ textDecoration: "none", color: "black", fontWeight: "700", fontSize: "22px" }}>

            {" "}

            MoviX.com

          </Link>

        </div>

      </footer>

    </div>
  )
}
