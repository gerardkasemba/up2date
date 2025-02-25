"use client";
import { useState, useEffect } from "react";
import Layout from "../../components/partner-comp/Layout";
import Prism from "prismjs";
import { FiPlusCircle, FiClipboard } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

// Import Prism.js CSS
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-php";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-json";

const sampleApiTokens = [
  { id: "key1", token: "API_KEY_ABC123", type: "WordPress" },
  { id: "key2", token: "API_KEY_DEF456", type: "Shopify" },
];

const codeSnippets = {
    WordPress: `
  <?php
    // SnabbDeal API Integration for WordPress
    function snabbdeal_delivery() {
      $apiKey = "YOUR_API_KEY";
      $deliveryDetails = array(
        "order_id" => get_order_id(),
        "customer_info" => get_customer_info(),
      );
      $response = wp_remote_post("https://api.snabbdeal.com/delivery", array(
        "headers" => array("Authorization" => "Bearer " . $apiKey),
        "body" => json_encode($deliveryDetails),
      ));
      return json_decode(wp_remote_retrieve_body($response));
    }
  ?>
    `,
    Shopify: `
  <script>
  // SnabbDeal API Integration for Shopify
  function snabbDealDelivery() {
    const apiKey = "YOUR_API_KEY";
    const deliveryDetails = {
      order_id: Shopify.checkout.order_id,
      customer_info: Shopify.checkout.customer,
    };
    fetch("https://api.snabbdeal.com/delivery", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryDetails),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }
  </script>
    `,
    Node: `
  const axios = require('axios');
  
  const snabbdealDelivery = async () => {
    const apiKey = 'YOUR_API_KEY';
    const deliveryDetails = {
      order_id: 'ORDER_ID',
      customer_info: 'CUSTOMER_INFO',
    };
    
    try {
      const response = await axios.post('https://api.snabbdeal.com/delivery', deliveryDetails, {
        headers: { Authorization: \`Bearer \${apiKey}\` },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };
  
  snabbdealDelivery();
    `,
    Ruby: `
  require 'net/http'
  require 'json'
  
  def snabbdeal_delivery
    api_key = 'YOUR_API_KEY'
    uri = URI('https://api.snabbdeal.com/delivery')
    delivery_details = {
      order_id: 'ORDER_ID',
      customer_info: 'CUSTOMER_INFO'
    }
    
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.path, {
      'Authorization' => "Bearer #{api_key}",
      'Content-Type' => 'application/json'
    })
    request.body = delivery_details.to_json
    
    response = http.request(request)
    puts response.body
  end
  
  snabbdeal_delivery
    `,
  };

const ApiSettings = () => {
  const [apiTokens, setApiTokens] = useState(sampleApiTokens);
  const [apiSnippetType, setApiSnippetType] = useState("");
  const [newToken, setNewToken] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Highlight code with Prism.js when the component mounts or when snippet type changes
    Prism.highlightAll();
  }, [apiSnippetType]);

  const handleSnippetTypeChange = (e) => {
    setApiSnippetType(e.target.value);
  };

  const handleGenerateApiToken = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedToken = `API_KEY_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      setApiTokens([...apiTokens, { id: `key${apiTokens.length + 1}`, token: generatedToken, type: apiSnippetType }]);
      setNewToken(generatedToken);
      setIsGenerating(false);
    }, 1000);
  };

  const handleDeleteToken = (tokenId) => {
    const updatedTokens = apiTokens.filter((token) => token.id !== tokenId);
    setApiTokens(updatedTokens);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[apiSnippetType]);
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4">API Settings</h2>

        {/* Choose API Snippet Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Choose API Snippet Type</label>
          <select
            value={apiSnippetType}
            onChange={handleSnippetTypeChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Type</option>
            <option value="WordPress">WordPress</option>
            <option value="Shopify">Shopify</option>
            <option value="Node">Node</option>
            <option value="Ruby">Ruby</option>
          </select>
        </div>

        {/* Display Snippet for Chosen Type */}
        {apiSnippetType && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">API Snippet Code for {apiSnippetType}</h3>
            <div className="relative bg-[#2d2d2d] text-white p-4 rounded-md overflow-auto border border-gray-700">
              <pre className="whitespace-pre-wrap language-javascript">
                <code className={`language-${apiSnippetType.toLowerCase()}`}>
                  {codeSnippets[apiSnippetType]}
                </code>
              </pre>
              <button
                onClick={handleCopyToClipboard}
                className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                <FiClipboard size={16} className="inline" /> Copy
              </button>
            </div>
          </div>
        )}

        {/* Generate New API Token */}
        <div className="mb-6">
          <button
            className={`w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none flex items-center justify-center ${
              isGenerating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleGenerateApiToken}
            disabled={isGenerating || !apiSnippetType}
          >
            <FiPlusCircle className="mr-2" size={20} />
            {isGenerating ? "Generating..." : "Generate New API Token"}
          </button>
          {newToken && (
            <div className="mt-2 text-sm text-green-600">
              <p>New API Key Generated: {newToken}</p>
            </div>
          )}
        </div>

        {/* Existing API Keys */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Existing API Keys</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Token ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">API Token</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {apiTokens.map((token) => (
                  <tr key={token.id} className="border-b">
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{token.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{token.token}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{token.type}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDeleteToken(token.id)}
                      >
                        <RiDeleteBin6Line size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {apiTokens.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No API tokens found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiSettings;
