import { Link } from '@remix-run/react';

export const WorkplaceCard = ({
  workplace
}: {
  workplace: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
  };
}) => {
  return (
    <Link to={`/app/${workplace.id}`} key={workplace.id}>
      <div className="bg-background rounded-xl p-5">
        <img
          src="https://www.macworld.com/wp-content/uploads/2023/01/folder-icon-macos-1.png?w=1024"
          alt="workplace"
          className="h-10"
        />
        <div className="mt-4">
          <div className="-mb-1">
            <span className="text-xs ">{new Date(workplace.createdAt).toDateString()}</span>
          </div>
          <span className="font-semibold text-primary text-lg capitalize">{workplace.title}</span>
        </div>
      </div>
    </Link>
  );
};
