import Dropdown from "react-bootstrap/Dropdown";

function Yeardopdown(props) {
  const { filterProducts = () => {} } = props;
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        style={{ marginTop: "2rem" }}
      >
        choisir une anne
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            filterProducts("1ere");
          }}
        >
          1ere
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterProducts("2eme");
          }}
        >
          2eme
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterProducts("3eme");
          }}
        >
          3eme
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterProducts("4eme");
          }}
        >
          4eme
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterProducts("5eme");
          }}
        >
          5eme
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            filterProducts("all");
          }}
        >
          tous les anne
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Yeardopdown;
