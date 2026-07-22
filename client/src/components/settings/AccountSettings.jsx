import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  getProfile,
  updateProfile,
  changePassword,
  updateAvatar,
} from "../../services/settingsAPI";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCamera,
  FiTrash2,
} from "react-icons/fi";

const AccountSettings = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
const [avatar, setAvatar] = useState("");
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const loadProfile = async () => {
  try {
    const res = await getProfile();

    const user = res.data.data;

    setForm((prev) => ({
      ...prev,
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
    }));
    setAvatar(user.profilePic || "");
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadProfile();
}, []);

const handleProfileSave = async () => {
  try {
    await updateProfile({
      fullName: form.fullName,
      username: form.username,
      phone: form.phone,
    });

    toast.success("Profile updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update profile");
  }
};
const handlePasswordChange = async () => {
  if (!form.currentPassword || !form.newPassword) {
    return toast.error("Fill all password fields");
  }

  if (form.newPassword !== form.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {
    await changePassword({
      oldPassword: form.currentPassword,
      newPassword: form.newPassword,
    });

    toast.success("Password changed");

    setForm((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  } catch (error) {
    console.error(error);
    toast.error("Failed to change password");
  }
};
const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const res = await updateAvatar(file);

   setAvatar(res.data.data.profilePic);

    toast.success("Profile picture updated");

  } catch (error) {
    console.error(error);
    toast.error("Upload failed");
  }
};

  return (
    <div className="space-y-8">

      {/* Profile Picture */}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">

        <h2 className="text-2xl font-semibold text-white">
          Profile
        </h2>

        <div className="mt-8 flex items-center gap-6">

          <div className="h-24 w-24 overflow-hidden rounded-full">

  {avatar ? (

    <img
      src={avatar}
      alt="avatar"
      className="h-full w-full object-cover"
    />

  ) : (

    <div className="flex h-full w-full items-center justify-center bg-cyan-500 text-3xl font-bold text-white">
      {form.fullName?.charAt(0).toUpperCase()}
    </div>

  )}

</div>
         <input
  id="avatar-upload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleAvatarUpload}
/>
          <button
          onClick={() =>
    document
      .getElementById("avatar-upload")
      .click()
  }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              font-semibold
              text-white
              hover:bg-cyan-600
            "
          >
            <FiCamera />
            Change Photo
          </button>

        </div>

      </div>

      {/* Personal Information */}

      <Section title="Personal Information">

        <Input
          icon={<FiUser />}
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <Input
          icon={<FiUser />}
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <Input
  icon={<FiMail />}
  label="Email"
  name="email"
  value={form.email}
  disabled
/>

        <Input
          icon={<FiPhone />}
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

      </Section>

      {/* Password */}

      <Section title="Change Password">

        <Input
          type="password"
          icon={<FiLock />}
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <Input
          type="password"
          icon={<FiLock />}
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
        />

        <Input
          type="password"
          icon={<FiLock />}
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

      </Section>

      <button
        onClick={async () => {
    await handleProfileSave();

    if (form.currentPassword || form.newPassword) {
      await handlePasswordChange();
    }
  }}
        className="
          w-full
          rounded-2xl
          bg-cyan-500
          py-4
          text-lg
          font-semibold
          text-white
          transition
          hover:bg-cyan-600
        "
      >
        Save Changes
      </button>

      {/* Danger Zone */}

      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

        <h2 className="text-xl font-semibold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-slate-400">
          Permanently delete your NovaChat account.
        </p>

        <button
          className="
            mt-5
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-500
            px-5
            py-3
            font-semibold
            text-white
            hover:bg-red-600
          "
        >
          <FiTrash2 />
          Delete Account
        </button>

      </div>

    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
    <h2 className="mb-6 text-2xl font-semibold text-white">
      {title}
    </h2>

    <div className="space-y-5">
      {children}
    </div>
  </div>
);

const Input = ({
  label,
  icon,
  type = "text",
  ...props
}) => (
  <div>
    <label className="mb-2 block text-sm text-slate-400">
      {label}
    </label>

    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-3">
      <div className="text-cyan-400 text-lg">
        {icon}
      </div>
<input
  type={type}
  className="w-full bg-transparent text-white outline-none disabled:cursor-not-allowed disabled:text-slate-400"
  {...props}
/>
    </div>
  </div>
);

export default AccountSettings;