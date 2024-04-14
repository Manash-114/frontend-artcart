import React from "react";

const Try = () => {
  const onclickHandle = (e) => {
    e.preventDefault();
    console.log();
  };
  return (
    <div>
      <form onClick={onclickHandle}>
        <input type="file" name="image"></input>
        <input type="submit">Submit</input>
      </form>
    </div>
  );
};

export default Try;
