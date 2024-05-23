import React from "react";
import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";
import { format } from "date-fns";

// Component for displaying a review card
const ReviewCard = ({
  user,
  firstName,
  lastName,
  ratings,
  comment,
  createdAt,
}) => {
  return (
    <div>
      {/* Review card */}
      <div className="card">
        {/* Avatar */}
        <div className="d-flex justify-content-center py-4">
          <Avatar src="" sx={{ width: "60px", height: "60px" }} />
        </div>
        {/* User name */}
        <div className="mb-2">
          <h6>
            {firstName} {lastName}
          </h6>
        </div>
        {/* Review content */}
        <div className="card-body pt-0 pb-2">
          <div>
            {/* Comment */}
            <small className="d-flex justify-content-start">{comment}</small>
          </div>
          {/* Rating and date */}
          <div className="d-flex align-items-center justify-content-between mt-2 mb-0">
            {/* Rating */}
            <div>
              <Rating
                className="d-flex justify-content-start"
                name="half-rating-read"
                value={ratings ? ratings : 0}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            {/* Date */}
            <div>
              <small className="text-secondary">
                {format(new Date(createdAt), "MM-dd-yyyy")}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
