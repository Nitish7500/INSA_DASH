import React from 'react';
import { Card, CardBody } from 'reactstrap';

export const SimpleCarousel = ({ title, img, detail, badges }) => {
    return (
        <div className="glide-item">
            <Card>
            <div className="position-relative">
                <img className="card-img-top" src={img} alt={title} />
                {badges &&
                badges.map((b, index) => {
                    return (
                    <span
                        key={`badges_${index}`}
                        className={`badge badge-pill badge-${
                        b.color
                        } position-absolute ${
                        index === 0
                            ? 'badge-top-left'
                            : `badge-top-left-${index + 1}`
                        }`}
                    >
                        {b.title}
                    </span>
                    );
                })}
            </div>
            <CardBody>
                <h6 className="mb-4">{title}</h6>
                <footer>
                <p className="text-muted text-small mb-0 font-weight-light">
                    {detail}
                </p>
                </footer>
            </CardBody>
            </Card>
        </div>
    );
};