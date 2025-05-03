import { Link } from "react-router-dom";
import colors from "../../styles/colors";

const Logo = () => (
  <Link to="/" className="text-2xl font-bold" style={{ color: colors.primary }}>
    Sleek<span style={{ color: colors.darkText }}>Sites</span>
  </Link>
);

export default Logo;
