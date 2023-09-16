import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_LINK_MUTATION = gql`
  mutation NewLink(
    $title: String!
    $address: String!
  ) {
    createLink(input: { title: $title, address: $address }) {
      id
      address
      title
    }
  }
`;

const CreateLink = () => {
    const [formState, setFormState] = useState({
        description: '',
        url: ''
    });

    const [createLink] = useMutation(CREATE_LINK_MUTATION, {
        variables: {
            title: formState.title,
            address: formState.address
        }
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createLink();
                }}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.title}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                title: e.target.value
                            })
                        }
                        type="text"
                        placeholder="A title for the link"
                    />
                    <input
                        className="mb2"
                        value={formState.address}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                address: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The address for the link"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateLink;