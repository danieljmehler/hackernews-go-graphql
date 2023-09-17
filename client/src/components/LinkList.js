import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const LINKS_QUERY = gql`
  {
    links {
      title
      address
      id
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(LINKS_QUERY)
  return (
    <div>
      <h1>Links</h1>
      {data && (
	<>
	  {data.links.map((link) => (
            <Link key={link.id} link={link} />
          ))}
	</>
      )}
    </div>
  );
};

export default LinkList;
