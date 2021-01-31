import React from "react";

export default function RoomTableSpinner(){
    return(
        <tr>
            <td colSpan={5}>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}