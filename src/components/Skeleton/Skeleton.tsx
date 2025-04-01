import { Skeleton as MUISkeleton, SkeletonProps } from '@mui/material';

type Props = SkeletonProps & {
  skeletonsNumber?: number;
};

export const Skeleton = ({ skeletonsNumber = 1, ...props }: Props) => {
  return (
    <>
      {Array(skeletonsNumber)
        .fill(1)
        .map((_, index) => (
          <MUISkeleton key={index} {...props} />
        ))}
    </>
  );
};
