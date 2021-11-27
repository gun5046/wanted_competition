import { gql } from '@apollo/client';

export const GET_HOME_INFO = gql`
	query getHomeInfo {
		getAllStore {
			id
			name
			imageURL
			address
			ph
			latitude
			longitude
			menus {
				name
				imageURL
			}
			reviews {
				text
				author
				storeName
				imageURL
				store {
					id
				}
				user {
					loginId
				}
			}
		}
	}
`;

export const GET_POINT = gql`
	query getPoint($loginId: String!) {
		getPoint(loginId: $loginId)
	}
`;
