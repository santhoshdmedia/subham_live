// eslint-disable-next-line no-unused-vars
import React from "react";
import News from "../../newsLetter/News";

const Privacypolicy = () => {
  const effectiveDate = "15th January 2024";

  // Reusable components for section titles and text blocks
  const SectionTitle = ({ children }) => <h2 className="text-xl md:text-2xl font-semibold text-black">{children}</h2>;
  const TextBlock = ({ children }) => <p className="text-base md:text-lg text-gray-700">{children}</p>;

  return (
    <>
      <div className="px-[6vw] py-16 md:py-20 ">
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-3xl font-Rubik text-center font-bold text-black">Privacy Policy for Subham Ferry Ticket Booking System</h1>
          <div className="space-y-2">
            <SectionTitle>Privacy Policy for Subham Ferry</SectionTitle>
            <TextBlock>Welcome to Subham, a ferry ticket booking service for travel between India and Sri Lanka. We are committed to protecting the privacy and security of our customers&apos; personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal information when you use our booking system. By using our services, you agree to the terms of this Privacy Policy.</TextBlock>
          </div>
          <div className="space-y-2">
            <SectionTitle>1.Information We Collect</SectionTitle>
            <TextBlock>We may collect the following types of personal information when you use our booking service:</TextBlock>
            <TextBlock>
              <strong className="text-black">Personal Identification Information:</strong> Name, email address, phone number, and other information you provide when registering or booking tickets.
            </TextBlock>
            <TextBlock>
              <strong className="text-black">Payment Information:</strong> Credit card details and other payment-related information (which are processed through secure payment gateways).
            </TextBlock>
            <TextBlock>
              <strong className="text-black">Travel Information:</strong> Travel dates, destination, and other details related to your ferry booking.
            </TextBlock>
            <TextBlock>
              <strong className="text-black">Technical Information:</strong> Information about your device, browser, IP address, and other technical data used to access our website or mobile app.
            </TextBlock>
          </div>
          <div className="space-y-2">
            <SectionTitle>2. How We Use Your Information</SectionTitle>
            <SectionTitle>Usage Data</SectionTitle>
            <TextBlock>We automatically collect information on how our service is accessed and used Usage Data This may include, but is not limited to</TextBlock>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong className="text-black">Device Information:</strong>Information about the device you use to access our service, such as device type, operating system, and unique device identifiers
              </li>
              <li>
                <strong className="text-black">IP Address:</strong>The unique address assigned to your device when you connect to the internet.
              </li>
              <li>
                <strong className="text-black">Access Time and Date:</strong> The date and time you access our service and how long you stay on our site or app.
              </li>
              <li>
                <strong className="text-black">Pages Visited:</strong>The specific pages or sections of our website or app that you visit.
              </li>
              <li>
                <strong className="text-black">Referring URL:</strong> The website or source that referred you to our service.
              </li>
              <li>
                <strong className="text-black">Cookies and Tracking Technologies:</strong> We use cookies to collect information on how you interact with our service to improve user experience
              </li>
              <li>
                <strong className="text-black">Browser Type:</strong>The specific browser you use to access our service, including the version number.
              </li>
            </ul>
            <p>This Usage Data helps us monitor and analyze trends, improve our website and app&apos;s performance, and enhance the overall user experience. We may also use this data for troubleshooting technical issues, optimizing the service, and offering personalized features.</p>
          </div>
          <div className="space-y-6">
            <SectionTitle>Use of Information</SectionTitle>
            <TextBlock>We use your personal information for the following purposes:</TextBlock>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong className="text-black">Processing Ferry Ticket Bookings:</strong>To complete and manage your ferry ticket bookings, ensuring that your travel arrangements are confirmed and processed correctly.
              </li>
              <li>
                <strong className="text-black">Managing Travel Arrangements:</strong>To coordinate and organize your ferry trip, including providing you with travel details, itinerary updates, and any changes to your bookings.
              </li>
              <li>
                <strong className="text-black">Payment Processing:</strong>To securely process your payment information, complete financial transactions, and handle billing details for your ferry tickets.
              </li>
              <li>
                <strong className="text-black">Communication:</strong>To send you booking confirmations, reminders, and updates regarding your travel, as well as provide you with important information related to your ferry trip.
              </li>
              <li>
                <strong className="text-black">Improving Services:</strong>To enhance the user experience, improve our platform&apos;s functionality, and provide better services based on your preferences and usage patterns.
              </li>
              <li>
                <strong className="text-black">Offering Personalized Experiences:</strong>To offer tailored content, promotions, and travel suggestions that are relevant to you, based on the data you provide and your previous interactions with our service.
              </li>
            </ul>
            <TextBlock>By using our service, you consent to the collection and use of your personal information for these purposes. If you do not agree with any aspect of this use, you may choose to discontinue the use of our service.</TextBlock>
          </div>
          <div className="space-y-2">
            <SectionTitle>Sharing of Information</SectionTitle>
            <TextBlock> We may share your personal information with trusted third-party service providers who perform services on our behalf. This includes:</TextBlock>
            <ul className="text-gray-600">
              <li>
                <strong className="text-black"> Payment Processing: </strong>To securely process your payments and handle billing information.
              </li>
              <li>
                <strong className="text-black">Data Analysis: </strong>To analyze trends, monitor usage, and improve the performance and functionality of our services
              </li>
              <li>
                <strong className="text-black">Customer Service</strong>To provide you with assistance related to your bookings, address any issues, and enhance your overall experience
              </li>
            </ul>
            <TextBlock> We do not sell, rent, or share your personal information with third parties for their marketing purposes without your explicit consent. Additionally, we may disclose your personal information when required to do so by law or to protect our rights, property, or safety, or that of our customers or others. We ensure that any third-party service providers we work with adhere to strict data protection standards to safeguard your personal information.</TextBlock>
          </div>
        </div>

        <div className="space-y-2">
          <SectionTitle>Data Security</SectionTitle>
          <TextBlock>We are committed to protecting the security of your personal information. To safeguard against unauthorized access, alteration, disclosure, or destruction of your data, we implement a variety of security measures, including Encryption, Secure Payment Processing, Access Control, Regular Security Audits, Data Backups. While we strive to implement the highest level of security measures, no method of data transmission over the internet or electronic storage is 100% secure. Therefore, while we take reasonable steps to protect your personal information, we cannot guarantee absolute security. If you believe your account or personal information has been compromised, please contact us immediately.</TextBlock>

          <div className="space-y-2">
            <SectionTitle>3. Cookies and Tracking Technologies</SectionTitle>

            <TextBlock>We use cookies and similar tracking technologies to collect information about your activity on our service and enhance your user experience. These technologies allow us to:</TextBlock>
            <TextBlock>
              <ul>
                <li>
                  <strong className="text-black">Track Activity: </strong>We monitor how you interact with our website or app, including the pages you visit, the features you use, and your preferences, to understand your behavior and improve our services
                </li>
                <li>
                  <strong className="text-black">Store Information: </strong>: Cookies help us store certain information, such as login details, language preferences, and session data, to offer a smoother and more personalized experience during your visits.
                </li>
                <li>
                  <strong className="text-black"> Enhance User Experience: </strong>: By using cookies, we can make your interactions with our website or app faster and more efficient. For example, cookies help you stay logged in, remember your preferences, and provide you with relevant content or promotions.
                </li>
              </ul>
              You can manage and control cookie settings through your browser settings. Most browsers allow you to block or delete cookies, but doing so may affect your experience with our service, as certain features may not work as intended.
            </TextBlock>
          </div>

          <div className="space-y-2">
            <SectionTitle>4.Your Rights</SectionTitle>
            <TextBlock>You have the following rights regarding the personal information we hold about you:</TextBlock>
            <TextBlock>
              <ul>
                <li>
                  <strong> Access:</strong>You have the right to request a copy of the personal information we hold about you. If you would like to know what information we have stored, you can contact us and request access.
                </li>
                <li>
                  <strong> Update: </strong>If any of your personal information is incorrect or incomplete, you have the right to request that we update or correct it.
                </li>
                <li>
                  <strong> Delete:</strong>You have the right to request the deletion of your personal information, subject to any legal obligations we may have to retain certain data. We will honor such requests to the extent permitted by law.
                </li>
                <li>
                  <strong> Opt-Out of Promotional Communications: </strong>You can opt out of receiving promotional emails, newsletters, or marketing communications from us at any time. You can do this by: o Clicking on the unsubscribe link in any promotional email. o Updating your preferences through your account settings (if available). o Contacting us directly to request removal from our marketing communications list.
                </li>
              </ul>
              If you exercise any of these rights, please note that it may affect our ability to provide certain services or features to you, such as personalized offers or communications related to your bookings. To exercise any of these rights or if you have any concerns about how we handle your personal information, please contact us at [contact information].
            </TextBlock>
          </div>

          <div className="space-y-2">
            <SectionTitle>5 .Changes to This Privacy Policy</SectionTitle>
            <TextBlock>We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. When we make updates, we will post the new Privacy Policy on this page, and the revised version will be effective immediately upon publication. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your personal information. If there are any significant changes to the way we handle your personal data, we will notify you through other means, such as email or an in-app notification.</TextBlock>
          </div>

          <div className="space-y-2">
            <SectionTitle>Contact Us</SectionTitle>
            <TextBlock>
              If you have any questions about this Privacy Policy, please contact us at <strong>info@sailsubham.com</strong>.
            </TextBlock>
          </div>

          <div className="space-y-2">
            <TextBlock>Subham respects your privacy and is committed to protecting it through this policy.</TextBlock>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacypolicy;
