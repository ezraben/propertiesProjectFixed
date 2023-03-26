const AboutPage = () => {
  return (
    <div className="container">
      <h1>about page</h1>
      <h2>property project</h2>
      <ul>
        <li>install node modules</li>
        <li>get .env file from the kampus website</li>
      </ul>{" "}
      <h4>the project has 3 kind of users</h4>
      <h5>1 - none registered :</h5>
      <p>
        can only register, login or see cards. <br />
        nav bar will contain logo login sign up an all cards
      </p>{" "}
      <h5>2- registered but not admin</h5>
      <p>
        {" "}
        nav bar will contain logo email of user all cards link liked property
        page link and logout link{" "}
      </p>{" "}
      <p>
        this kind of user can like property cards and see them on his liked
        property page.{" "}
      </p>{" "}
      <h5>3- admin </h5>
      <p>
        {" "}
        nav bar will contain logo email of user dashboard link create card
        component link liked property page link all cards link and logout{" "}
      </p>{" "}
      <p>
        {" "}
        to create an admin account, on the register page you must tick the check
        box input on the bottom of the form.
      </p>{" "}
      <p>
        admin can create cards, up date cards and delete them. admin the same as
        regular user can licked property and then he can see them on the liked
        property page
      </p>{" "}
      <p> up date ot delete cards will be found in the dashboard page</p>
      <p> footer will be the same in all pages</p>
    </div>
  );
};

export default AboutPage;
