import React from 'react'
import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='flex flex-col items-center mx-auto max-w-sm space-y-6 font-mono whitespace-nowrap'>
      <Link to="/" className='w-48 text-center cursor-pointer select-none space-y-1 border-b-2'>
        <h1 className='tracking-wider text-5xl font-serif '>JetL</h1>
        <h2 className='font-serif tracking-wide'>Since 2021</h2>
      </Link>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage