import React from "react";
import Link from "next/link";

const AboutFront = () => {
  return (
    <div className="ab-home container py-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="mb-3">About the organization</h2>
          <p>
            APMC (Agricultural Produce Market Committee) is a system that provides a secure and transparent platform for farmers to sell their produce and traders to buy it. This committee is recognized by the state government and protects the rights of farmers.
          </p>
          <h5 className="mt-4">
            Main functions of APMC:<br />For farmers :
          </h5>
          <p>
            The right place to sell the product provides a safe and proper place for selling goods to the APMC farmers. Information on market prices provides information on market prices to APMC farmers, so that they can get the right rates for their goods.
            Protection from exploitation protects the farmers from the exploitation of APMC traders. The protection of the rights APMC protects the farmers' rights and provides them with proper justice.
          </p>
          <Link href="/about-us" className="btn btn-warning mt-3">
            Read More &gt;
          </Link>
        </div>

        {/* Image Section */}
        <div className="col-md-6 text-center">
          <img
            src="/About-Agri.png"
            alt="Market Scene"
            className="img-fluid mb-3"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutFront;
