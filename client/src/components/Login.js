import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $password: String!
    $username: String!
  ) {
    createUser(input: { username: $username, password: $password})
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    login(input: { username: $username, password: $password })
  }
`;

const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        username: '',
        password: '',
        name: ''
    });

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
            username: formState.username,
            password: formState.password
        },
        onCompleted: ({ login }) => {
            localStorage.setItem(AUTH_TOKEN, login);
            navigate('/');
        }
    });

    const [createUser] = useMutation(CREATE_USER_MUTATION, {
        variables: {
            username: formState.username,
            password: formState.password
        },
        onCompleted: ({ signup }) => {
            localStorage.setItem(AUTH_TOKEN, signup);
            navigate('/');
        }
    });

    return (
        <div>
            <h4 className="mv3">
                {formState.login ? 'Login' : 'Sign Up'}
            </h4>
            <div className="flex flex-column">
                <input
                    value={formState.username}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            username: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Your username"
                />
                <input
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <button
                    className="pointer mr2 button"
                    onClick={formState.login ? login : createUser}
                >
                    {formState.login ? 'login' : 'create account'}
                </button>
                <button
                    className="pointer button"
                    onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                    }
                >
                    {formState.login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </button>
            </div>
        </div>
    );
};

export default Login;