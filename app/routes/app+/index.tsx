import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function AppIndex() {
  return (
    <div className="space-y-4 container mx-auto space-x-4">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYgjtV5OfaMxyjJ3NFSvZvi2d0OkOOnHXWA&usqp=CAU"
            alt="Shoes"
            className="w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
