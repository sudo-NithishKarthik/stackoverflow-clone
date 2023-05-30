import React from "react";

const ProfileBio = ({ currentProfile }) => {
	return (
		<div className="current-user-profile-main">
			<div className="user-tags">
				{currentProfile?.tags.length !== 0 ? (
					<>
						<h4>Tags watched</h4>
						{currentProfile?.tags.map((tag) => (
							<p key={tag} className="user-all-tags">
								{tag}
							</p>
						))}
					</>
				) : (
					<p>0 tags watched</p>
				)}
			</div>
			<div className="user-about">
				{currentProfile?.about ? (
					<>
						<h4>About</h4>
						<p className="user-about-para">{currentProfile?.about}</p>
					</>
				) : (
					<p>No bio found</p>
				)}
			</div>
		</div>
	);
};

export default ProfileBio;
