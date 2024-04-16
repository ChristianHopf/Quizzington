import React from "react";

type Props = {
  show: boolean;
  unansweredQuestions: number[];
  onSelectUnanswered: (index: number) => void;
  onClose: () => void;
  onConfirm: () => void;
};

function SubmitModal({
  show,
  unansweredQuestions,
  onSelectUnanswered,
  onClose,
  onConfirm,
}: Props) {
  if (!show) return null;

  return (
    <dialog
      open
      className=" w-full min-h-screen fixed inset-0 flex justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-8 py-6 fixed mt-36">
        <h1 className="text-xl mb-2">
          Are you sure you want to submit your quiz?
        </h1>
        {unansweredQuestions.length > 0 && (
          <>
            <p className="mb-4">
              You still have{" "}
              {unansweredQuestions.length === 1
                ? "a question "
                : "some questions "}{" "}
              left to answer:
            </p>
            <div className="flex flex-col gap-2 mb-4">
              {unansweredQuestions?.map((index) => (
                <button
                  key={index}
                  className="text-lg mx-auto rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-200 hover:text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectUnanswered(index);
                  }}
                >
                  Question {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#7209b7] text-white rounded-lg px-6 py-3 hover:bg-purple-800 focus:outline-none focus:bg-purple-800"
            onClick={onConfirm}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default SubmitModal;
