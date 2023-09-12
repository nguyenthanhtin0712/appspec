import { Stack } from '@mui/material';
import InternPosition from 'sections/user/register_internship/InternPosition';

const ListInternPosition = ({ positions }) => {
  return (
    <Stack spacing={2}>
      {positions.length > 0 && positions.map((position, index) => <InternPosition key={index} position={position} />)}
    </Stack>
  );
};

export default ListInternPosition;
