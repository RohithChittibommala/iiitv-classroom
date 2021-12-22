import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useQuery } from "react-query";

import { useNavigate, useParams } from "react-router-dom";
import api from "../../network";
import DisplayMsg from "../DisplayMessage";
import Loading from "../Loading";

const headers = ["Name", "Email", "Submission Time", "Status", "Submission"];

function SubmissionsView() {
  const { assignmentId } = useParams();

  const navigate = useNavigate();

  const { data: submissions, isLoading } = useQuery(
    [`submissions`, assignmentId],
    () => api.getSubmissions(assignmentId),
    {
      select: ({ data }) => data?.submissions,
    }
  );

  if (isLoading) return <Loading />;

  if (submissions?.length === 0)
    return <DisplayMsg msg={"No Submissions Yet ^__^"} />;

  return (
    <section className="mx-auto p-6 font-mono md:mt-24">
      <button className="mb-6 flex " onClick={() => navigate(-1)}>
        <BsArrowLeft className="w-6 h-6 mr-1" /> Go Back
      </button>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full ">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {submissions.map((submission) => (
                <tr className="text-gray-700" key={submission._id}>
                  <td className="px-4 py-3 border">
                    <p className="font-semibold text-black">
                      {submission.studentId?.name}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-base font-semibold border">
                    {submission?.studentId?.email}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {new Date(submission.submissionDate).toDateString()}
                    {new Date(submission.submissionDate).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {Date.parse(submission.deadline) >
                    Date.parse(submission.submissionDate) ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        Acceptable
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        Late
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    <a href={submission.pdf} target="_blank" rel="noreferrer">
                      View Submission
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SubmissionsView;
