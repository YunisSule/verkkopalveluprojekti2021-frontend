import { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

export default function TableDropdown({ onEditClick, onDeleteClick }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownToggle = () => setOpenDropdown(!openDropdown);

  return (
    <Dropdown tag="td" isOpen={openDropdown} toggle={() => dropdownToggle()}>
      <DropdownToggle data-toggle="dropdown" tag="span">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </DropdownToggle>
      <DropdownMenu dark>
        <div className="product-dropdown-item" onClick={() => onEditClick()}>
          Muokkaa
        </div>
        <div className="product-dropdown-item" onClick={() => onDeleteClick()}>
          Poista
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
