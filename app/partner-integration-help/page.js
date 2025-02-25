// app/integration-help/page.js
"use client";
import { useState } from "react";
import Layout from "../../components/partner-comp/Layout"; // Wrap in Layout
import CodeSnippet from "../../components/partner-comp/CodeSnippet"; // Component for code display
import "../../styles/integrations.css"; // Import custom styles

export default function IntegrationHelp() {
  const [selectedPlatform, setSelectedPlatform] = useState("Shopify");

  const platforms = ["Shopify", "WordPress", "Node.js", "Ruby", "Other"];

  const getIntegrationSteps = (platform) => {
    switch (platform) {
      case "Shopify":
        return {
          title: "Shopify Integration",
          steps: [
            "Login to your Shopify Admin Dashboard.",
            "Go to ‘Settings’ and select ‘Shipping and Delivery’.",
            "In the ‘Additional Shipping Methods’ section, click on ‘Add Custom Carrier’.",
            "Enter the carrier name as ‘SnabbDeal’ and paste the provided API key.",
            "Save your changes, and you’re ready to go!"
          ],
          code: `
          // Shopify Example Snippet
          const snabbDeal = require('snabbdeal');
          
          snabbDeal.init({
            apiKey: 'YOUR_API_KEY',
            carrier: 'SnabbDeal',
            deliveryType: 'Same Day'
          });
          `,
        };
      case "WordPress":
        return {
          title: "WordPress Integration",
          steps: [
            "Install the 'SnabbDeal Shipping Plugin' from the WordPress Plugin Directory.",
            "Activate the plugin and go to the plugin settings.",
            "Enter your API key in the ‘SnabbDeal API Key’ field.",
            "Configure the delivery options and save your settings.",
          ],
          code: `
          // WordPress Integration Example
          function snabbdeal_integration() {
            $apiKey = 'YOUR_API_KEY';
            add_filter('woocommerce_shipping_methods', 'add_snabbdeal_method');
            // Code to add custom shipping logic here
          }
          add_action('init', 'snabbdeal_integration');
          `,
        };
      case "Node.js":
        return {
          title: "Node.js Integration",
          steps: [
            "Install the SnabbDeal Node.js SDK using npm or yarn.",
            "Initialize the SDK with your API key.",
            "Use the SDK methods to create orders, fetch delivery status, and more.",
          ],
          code: `
          // Node.js Example
          const snabbDeal = require('snabbdeal-sdk');
          
          snabbDeal.init({
            apiKey: 'YOUR_API_KEY'
          });

          snabbDeal.createOrder({
            customerName: 'John Doe',
            deliveryAddress: '123 Example St',
            items: [...],
          });
          `,
        };
      case "Ruby":
        return {
          title: "Ruby Integration",
          steps: [
            "Install the SnabbDeal Ruby Gem using the command: gem install snabbdeal",
            "Initialize the client with your API key in the configuration file.",
            "Use available methods to manage deliveries, fetch statuses, and more.",
          ],
          code: `
          # Ruby Example
          require 'snabbdeal'

          SnabbDeal.configure do |config|
            config.api_key = 'YOUR_API_KEY'
          end

          SnabbDeal::Order.create(
            customer_name: 'Jane Doe',
            delivery_address: '123 Example St',
            items: [...]
          )
          `,
        };
      default:
        return {
          title: "Other Integrations",
          steps: [
            "If your platform isn’t listed, contact SnabbDeal support for a custom integration solution.",
            "You can also visit our developer documentation at 'https://docs.snabbdeal.com' for detailed information."
          ],
          code: `
          // Generic Integration Example
          const snabbDeal = new SnabbDealClient({
            apiKey: 'YOUR_API_KEY',
            platform: 'Custom'
          });

          snabbDeal.createOrder({...});
          `,
        };
    }
  };

  const integration = getIntegrationSteps(selectedPlatform);

  return (
    <Layout>
      <div className="integration-help-container p-6">
        <h1 className="text-2xl font-bold mb-4">Integration Help</h1>
        <div className="flex flex-col md:flex-row mb-6">
          <nav className="w-full md:w-1/4">
            <ul className="space-y-4">
              {platforms.map((platform) => (
                <li key={platform}>
                  <button
                    className={`p-3 w-full text-left transition duration-300 rounded-lg ${selectedPlatform === platform ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    {platform}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full md:w-3/4 mt-4 md:mt-0 md:ml-6">
            <h2 className="text-xl font-semibold mb-3">{integration.title}</h2>
            <ul className="list-disc ml-6 mb-4 space-y-2">
              {integration.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            <CodeSnippet code={integration.code} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
