import { gql } from '@apollo/client';

export const SIGN_USER = gql`
	mutation signUser(
		$loginId: String!
		$email: String!
		$nickname: String!
		$age: String!
		$gender: String!
		$profileImageURL: String
	) {
		signUser(
			loginId: $loginId
			email: $email
			nickname: $nickname
			age: $age
			gender: $gender
			profileImageURL: $profileImageURL
		)
	}
`;

export const INSERT_REVIEW = gql`
	mutation insertReview(
		$text: String
		$reviewImage: Upload
		$storeId: Int!
		$loginId: String!
	) {
		insertReview(
			text: $text
			reviewImage: $reviewImage
			storeId: $storeId
			loginId: $loginId
		) {
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
`;

export const SAVE_IMAGE = gql`
	mutation saveImage($file: Upload!) {
		saveImage(file: $file) {
			profileImageURL
			nickname
			age
			gender
			point
			actions
			actionToday
			nowAnimal
			completeAnimal
		}
	}
`;

export const GIVE_POINT = gql`
	mutation givePoint($loginId: String!) {
		givePoint(loginId: $loginId)
	}
`;
