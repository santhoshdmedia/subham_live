import React from "react";
import News from "../../newsLetter/News";

const Travelpolicy = () => {
  return (
    <>
      <div className="px-[6vw] py-16 md:py-20">
        <h1 className="text-3xl font-semibold text-center font-Rubik mb-8">TRAVEL POLICIES</h1>

        <div className="space-y-8">
          {/* Check-in and Arrival Section */}
          <section>
            <h2 className="text-2xl font-semibold">Check-in and Arrival</h2>
            <p className="text-lg text-gray-700 mt-2">We recommend arriving at the Port 3 hours before the scheduled departure time. The Check-in counter will close 45 minutes before the scheduled departure time.</p>
          </section>

          {/* Passenger Information Change Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Passenger Information Change Policy</h2>
            <p className="text-lg text-gray-700 mt-2">Customers and travel agents are advised to provide accurate passenger information at the time of booking. Any incorrect details, including spelling errors in names, passport information, or visa details, will incur a correction fee of ₹1,000/- (or LKR 3,500/- or USD 12) at the time of check-in.</p>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Refund Policy</h2>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Cancellation 72 hours or more before departure: 80% of the ticket amount will be refunded.</li>
              <li>Cancellation between 24 hours to 72 hours before departure: 70% of the ticket amount will be refunded.</li>
              <li>Cancellation within 24 hours of departure: No refund will be provided.</li>
            </ul>
          </section>

          {/* Reschedule Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Reschedule Policy</h2>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Rescheduling 72 hours before departure: A fee equivalent to 20% of the ticket amount will apply.</li>
              <li>Rescheduling between 24 to 72 hours before departure: A fee equivalent to 30% of the ticket amount will apply.</li>
              <li>Rescheduling within 24 hours of departure: Rescheduling is not permitted.</li>
            </ul>
          </section>

          {/* Voyage Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Voyage Cancellation Policy</h2>
            <p className="text-lg text-gray-700 mt-2">In cases where the Voyage is canceled by the Management, customers will be entitled to one of the following options without incurring any additional charges:</p>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Full Refund: 100% of the ticket amount will be refunded.</li>
              <li>Rescheduling: The ticket can be rescheduled for a future date.</li>
            </ul>
          </section>

          {/* Hand Luggage Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Hand Luggage Policy</h2>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Passengers are allowed to carry one carry-on bag along with a personal item.</li>
              <li>The carry-on bag, including the handles and wheels, must not exceed the dimensions of 22 x 14 x 9 inches (56 x 36 x 23 cm), with a maximum weight of 22lbs / 10kg.</li>
            </ul>
          </section>

          {/* Checked Bag Policy */}
          <section>
            <h2 className="text-2xl font-semibold">Checked Bag Policy</h2>
            <h4 className="underline py-2 text-xl font-semibold">1. Checked Bag Allowances and Fees:</h4>
            <h4 className=" py-2 font-semibold">All Checked Baggage will be Chargeables</h4>
            <p className="text-lg text-gray-700 mt-2">All checked baggage must be pre-booked online. Extra checked baggage cannot be added at the time of check-in. All baggage fees are non-refundable and apply per person, per location for each one-way check-in.</p>
            <h5 className="underline pt-5 text-xl font-semibold">2. Bag Limitation:</h5>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li>Maximum 3 bags allowed.</li>
            </ul>
            <h5 className="underline pt-5 text-xl font-semibold">3. Baggage Weight and Size:</h5>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li>Total bag dimension (length + width + height): 62 in / 158 cm</li>
              <li>Maximum weight per bag: 44 lbs / 20 kg</li>
            </ul>
            <h5 className="underline pt-5 text-xl font-semibold">4. Oversized Baggage:</h5>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li>No charges will be levied for bags sized up to 5 cubic feet.</li>
              <li>INR 400 will be charged per cubic foot for bags exceeding 5 cubic feet.</li>
            </ul>
          </section>

          {/* Visa Requirements Section */}
          <section>
            <h2 className="text-2xl font-semibold">Visa Requirements</h2>

            {/* Indian Passport Holders */}
            <h3 className="text-xl font-semibold mt-4">For Indian Passport Holders Entering Sri Lanka:</h3>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Passport must be valid for at least 6 months (180 days) from the travel date.</li>
              <li>A return ticket or an onward ticket (by Sea or Air from Sri Lanka, or an onward ticket for onward journey from Sri Lanka) is required.</li>
            </ul>

            {/* Sri Lankan Passport Holders */}
            <h3 className="text-xl font-semibold mt-4">For Sri Lankan Passport Holders Entering India:</h3>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>Passport must be valid for at least 6 months (180 days) from the entry date.</li>
              <li>A valid visa issued by an Indian High Commission or Embassy is mandatory.</li>
              <li>First-time entry with a new e-visa is not permitted through Nagapattinam port. However, travelers who have previously entered India using the same e-visa may re-enter via Nagapattinam port for onward travel or return journey.</li>
            </ul>

            {/* International Passport Holders */}
            <h3 className="text-xl font-semibold mt-4">For All Other International Passport Holders Entering India:</h3>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>A passport with a minimum of 6 months (180 days) from the date of entry is required.</li>
              <li>If the passport-issuing country is exempted from visa requirements for entry into India, no visa is needed. Otherwise, a valid visa issued by the Indian High Commission or Embassy is required.</li>
              <li>First-time entry with a new e-visa is not permitted through Nagapattinam port. However, travelers who have previously entered India using the same e-visa may re-enter via Nagapattinam port for onward travel or return journey.</li>
            </ul>

            {/* Sri Lankan Visa Details */}
            <h3 className="text-xl font-semibold mt-4">For All Other International Passport Holders Entering Sri Lanka:</h3>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>A passport with a minimum validity of 6 months (180 days) from the date of entry is required.</li>
              <li>Travelers from visa-on-arrival countries do not need to obtain a visa in advance. All other travelers must secure a valid visa to enter Sri Lanka.</li>
              <li>All tourists or visitors require a valid return or onward journey ticket.</li>
            </ul>

            {/* Additional Notes */}
            <h3 className="text-xl font-semibold mt-4">Additional Notes for All Travelers:</h3>
            <ul className="list-disc pl-5 mt-2 text-lg text-gray-700">
              <li>All tourists and visitors must possess a valid return or onward journey ticket.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Travelpolicy;
