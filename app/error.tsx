'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="">
      <h2 className="">Oh no!</h2>
      <p className="">
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button
        className=""
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
