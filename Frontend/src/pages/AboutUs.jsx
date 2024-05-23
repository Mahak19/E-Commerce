import React from "react";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="py-2">
        <h2 className="text-uppercase fw-semibold text-center">
          About Us
        </h2>
        <hr className="my-2 text-secondary-subtle" />
      </div>
      <div className="row gy-3 my-1 pb-4">
        <div className="col-lg-6">
          <div className="my-5">
            <img
              src="https://www.apple.com/v/apple-events/home/aa/images/meta/overview__bcphzsdb4fpu_og.png?202308230108"
              alt="Brand Image"
              className="rounded"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="text-center">Our Story</h4>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
            minima sed omnis veniam a odio? Soluta minus quis officia beatae
            consectetur debitis aperiam, autem voluptatum dicta explicabo
            quaerat rem amet.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
            minima sed omnis veniam a odio? Soluta minus quis officia beatae
            consectetur debitis aperiam, autem voluptatum dicta explicabo
            quaerat rem amet.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem
            minima sed omnis veniam a odio? Soluta minus quis officia beatae
            consectetur debitis aperiam, autem voluptatum dicta explicabo
            quaerat rem amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
