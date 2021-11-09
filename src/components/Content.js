import { Routes, Route } from 'react-router';
import Frontpage from './Frontpage';

export default function Content() {
  return (
    <div>
      <Routes>
        <Route path="/components/Frontpage" element={<Frontpage />} />
      </Routes>
    </div>
  );
}
