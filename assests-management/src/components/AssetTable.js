
import React from "react";
import { connect } from "react-redux";
import { editCrownJewel } from "../actions/assetActions";
import iconGreen from "../icons/dashboard.png";
import iconBlue from "../icons/dashboard-1.png";
import iconGrey from "../icons/dashboard-2.png";
import iconRed from "../icons/dashboard-3.png";

import "./AssetTable.css";

const AssetTable = ({ assets, editCrownJewel }) => {
  const handleCrownJewelEdit = (assetId, newValue) => {
    editCrownJewel(assetId, newValue);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Creation Date</th>
          <th>Criticality</th>
          <th>Type</th>
          <th>Env</th>
          <th>Is Crown Jewel</th>
          <th>Asset Name</th>
          <th>Owner Name</th>
          <th>Tags</th>
          <th>Edit Is Crown Jewel</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset._id}>
            <td>{new Date(asset.created).toLocaleString()}</td>
            <td>{asset.criticalityFactor}</td>
            <td>{asset.enrich.assetType}</td>
            <td>{asset.enrich.env}</td>
            <td className="icon-cell">
              {asset.enrich.isCrownJewel ? (
                asset.enrich.crownJewelIndicator === "OVERRIDE" ? (
                  <img src={iconRed} alt="Red Icon" />
                ) : (
                  <img src={iconGreen} alt="Green Icon" />
                )
              ) : asset.enrich.crownJewelIndicator === "OVERRIDE" ? (
                <img src={iconBlue} alt="Blue Icon" />
              ) : (
                <img src={iconGrey} alt="Grey Icon" />
              )}
            </td>

            <td>{asset.name}</td>
            <td>{asset.owner.name}</td>
            <td>
              {asset.tags.map((tag) => `${tag.key}: ${tag.value}`).join(", ")}
            </td>
            <td>
              <select
                value={asset.enrich.isCrownJewel}
                onChange={(e) =>
                  handleCrownJewelEdit(asset._id, e.target.value === "true")
                }
              >
                <option value={false}>false</option>
                <option value={true}>true</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  assets: state.assets.filteredAssets,
});

const mapDispatchToProps = (dispatch) => ({
  editCrownJewel: (assetId, newValue) =>
    dispatch(editCrownJewel(assetId, newValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
