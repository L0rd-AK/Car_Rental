import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../authProvider/AuthProvider";
const SignIn = () => {
  const { signIn_with_email } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn_with_email(data?.email, data?.password)
      .then((res) => {
        console.log(res);
        toast.success('Successfully SignIn!!!');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };
  return (
    <div>
      <div className="max-w-md mx-auto  ">
        <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Email address *</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("email", { required: true })}
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Password *</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("password", { required: true })}
            />
          </label>
          <div className="">
            <input type="checkbox" />
            <span> Remember me</span>
          </div>
          <div className="">
            <button className="w-full btn">SignIn</button>
          </div>
          <h3 className="text-red-400">Lost your password?</h3>
        </form>
      </div>
    </div>
  );
};

export default SignIn;