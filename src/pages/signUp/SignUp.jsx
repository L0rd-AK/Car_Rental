import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authProvider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const photo =
  "https://www.libarts.colostate.edu/wp-content/uploads/2018/02/userphoto.png";


  
const SignUp = () => {
  const { create_user_with_email, update_profile } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    create_user_with_email(data?.email, data?.password)
      .then((res) => {
        console.log(res);

        update_profile(data?.name, photo)
        .then(() => {
          axiosPublic.post("/users",{... data,image: photo,phone:'+8801xxxxxxxxx',no_orders:0,total_spend: 0,role:'user'}).then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              toast.success("Registration Complete!!!");
              navigate("/");
            } else {
              toast.error("Something went wrong");
            }
          });
        });
      
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error : ${err.code}`);
      });
  };

  return (
    <div>
      <div className="max-w-md mx-auto  ">
        <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Username *</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </label>
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
              {...register("password", {
                required: true,
                maxLength: 16,
                minLength: 8,
              })}
            />
          </label>
          <p className="">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="text-red-400">privacy policy</span>.
          </p>
          <div className="">
            <button className="w-full btn">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;