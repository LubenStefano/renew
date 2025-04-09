import React from "react";
import styles from "./ProfileHeader.module.css";
import Button from "../Button/Button";
import { Skeleton } from 'antd';
import { useNavigate } from "react-router";
import { useDeleteUser } from "../../../hooks/useAuth";

export default function ProfileHeader({ userById, isCurrentUser }) {
    const navigate = useNavigate();
    const { deleteUser } = useDeleteUser();

    if (!userById) {
        return (
            <div className={styles["profile-header"]}>
                <Skeleton.Avatar active size={100} className={styles["profile-picture"]} />
                <div className={styles["profile-info"]}>
                    <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 1, width: ['60%'] }} />
                    <Skeleton active title={false} paragraph={{ rows: 3, width: ['50%', '70%'] }} />
                </div>
                {isCurrentUser && (
                    <div className={styles["profile-actions"]}>
                        <Skeleton.Button active className={styles["profile-actions"]} style={{ width: 120 }} />
                        <Skeleton.Button active className={styles["profile-actions"]} style={{ width: 120 }} />
                    </div>
                )}
            </div>
        );
    }

    const editProfile = () => {
        navigate('/profile/edit');
    };

    const deleteProfile = () => {
        if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            deleteUser(userById.id)
                .then(() => {
                    console.log("User deleted successfully!");
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        }
    };

    return (
        <div className={styles["profile-header"]}>
            <img src={userById.profilePicture} alt="Profile" className={styles["profile-picture"]} />
            <div className={styles["profile-info"]}>
                <h2>{userById.name}</h2>
                <p><strong>contacts:</strong></p>
                <p>gsm: {userById.phone}</p>
                <p>email: {userById.email}</p>
            </div>
            {isCurrentUser && ( // Conditionally render edit and delete buttons
                <div className={styles["profile-actions"]}>
                    <Button text="EDIT PROFILE" className={styles["edit-profile"]} onClick={editProfile} />
                    <Button text="DELETE PROFILE" className={styles["delete-profile"]} onClick={deleteProfile} />
                </div>
            )}
        </div>
    );
}


