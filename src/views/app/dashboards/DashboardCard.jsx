import react from "react";
import { CardBody, Card } from "reactstrap";

const DashboardCard = ({name, value}) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 mb-3 rounded">
      <Card style={{wordBreak:"break-all"}}>
        <CardBody className="text-dark m-2 p-2">
          <p style={{color:"#999"}} className="font-weight-bold">{name}</p>
          <span className="font-weight-bold h3">{value}</span>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardCard;