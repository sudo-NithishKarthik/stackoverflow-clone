import React, { useEffect } from "react";

const ProfileBio = ({ currentProfile }) => {
  console.log({ currentProfile })
  useEffect(() => {
    const form = document.createElement("form")
    const script = document.createElement('script')
    script.id = 'razorpay'
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.async = true
    script.setAttribute("data-payment_button_id", "pl_MPLF8esetNHPXU")
    form.appendChild(script)
    document.body.append(form)
  }, [])
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
      <div>
        Subscription Status: {currentProfile?.subscriptionStatus}
      </div>
      <form><script src="https://checkout.razorpay.com/v1/payment-button.js" async> </script> </form>
    </div>
  );
};

export default ProfileBio;
