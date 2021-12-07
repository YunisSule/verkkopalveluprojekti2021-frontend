import { Button } from 'reactstrap';

export default function AddButton({ clickAction }) {
  return (
    <Button className="d-flex ps-2 align-items-center" onClick={() => clickAction()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
      Lisää
    </Button>
  );
}