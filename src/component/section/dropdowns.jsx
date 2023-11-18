import Dropdown from "react-bootstrap/Dropdown";
const Dropdowns = ({ title }) => {
  const firstItemHref = `${title}1`;
  const temHref2 = `${title}2`;
  const ItemHref3 = `${title}3`;
  const ItemHref4 = `${title}4`;
  const ItemHref5 = `${title}5`;

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="danger"
        id="dropdown-basic"
        drop="down-centered"
      >
        {` ${title}  `}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href={firstItemHref}>1ere </Dropdown.Item>
        <Dropdown.Item href={temHref2}>2eme</Dropdown.Item>
        <Dropdown.Item href={ItemHref3}>3eme</Dropdown.Item>
        <Dropdown.Item href={ItemHref4}>4eme</Dropdown.Item>
        <Dropdown.Item href={ItemHref5}>5eme</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Dropdowns;
