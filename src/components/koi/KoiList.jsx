import React from "react";
// import styles
import "../../styles/components/koi/koi.css";
// import assets
import image from "../../assets/logincover2.jpg";
export const KoiList = () => {
  return (
    <table className="koi-list-table">
      <thead>
        <tr>
          <td>Infomation</td>
          <td>Type</td>
          <td>Weight</td>
          <td>Size</td>
          <td>Origin</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <img src={image} alt="" />
            <div>
              <strong>Izumiya Koi Fish</strong>
              <p>2 Age</p>
            </div>
          </th>
          <th>Sanke</th>
          <th>2.3kg</th>
          <th>40cm</th>
          <th>Japan</th>
        </tr>
        <tr>
          <th>
            <img src={image} alt="" />
            <div>
              <strong>Izumiya Koi Fish</strong>
              <p>2 Age</p>
            </div>
          </th>
          <th>Sanke</th>
          <th>2.3kg</th>
          <th>40cm</th>
          <th>Japan</th>
        </tr>
        <tr>
          <th>
            <img src={image} alt="" />
            <div>
              <strong>Izumiya Koi Fish</strong>
              <p>2 Age</p>
            </div>
          </th>
          <th>Sanke</th>
          <th>2.3kg</th>
          <th>40cm</th>
          <th>Japan</th>
        </tr>
      </tbody>
    </table>
  );
};
